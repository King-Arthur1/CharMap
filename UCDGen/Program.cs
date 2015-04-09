using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;

namespace UCDGen
{
    class Program
    {
        static void Main(string[] args)
        {
            var filterBlocks = true;
            string[] blocksToInclude = new string[]{
                "Basic Latin",
                "Latin-1 Supplement",
                "Miscellaneous Symbols and Pictographs",
                "Emoticons",
                "Transport and Map Symbols"
            };
            List<Tuple<int,int>> filters = new List<Tuple<int,int>>();

            var w = new JsonTextWriter(Console.Out);
            w.Indentation = 2;
            w.Formatting = Formatting.Indented;
            var files = Directory.EnumerateFiles(args.Length > 0 ? args[0] : ".", "*.txt").ToDictionary(f=>Path.GetFileName(f).ToLowerInvariant(), f=>File.ReadAllText(f));
            w.WriteStartObject();

            // blocks
            //
            w.WritePropertyName("blocks");
            w.WriteStartArray();
            foreach (var line in files["blocks.txt"].Split('\r', '\n'))
            {
                if (line.Trim().Length < 1) continue;
                if (line.Trim().StartsWith("#")) continue;

                var parts = line.Split(';');
                var range = parts[0].Split(new string[] { ".." }, StringSplitOptions.RemoveEmptyEntries);
                string name = parts[1].Trim();

                if (!filterBlocks || blocksToInclude.Contains(name))
                {
                    var start = int.Parse(range[0], System.Globalization.NumberStyles.AllowHexSpecifier);
                    var end = int.Parse(range[1], System.Globalization.NumberStyles.AllowHexSpecifier);
                    if (filterBlocks) {
                        filters.Add(new Tuple<int,int>(start, end));
                    }
                    w.WriteStartObject();
                    w.WritePropertyName("start");
                    w.WriteValue(start);
                    w.WritePropertyName("end");
                    w.WriteValue(end);
                    w.WritePropertyName("name");
                    w.WriteValue(name);
                    w.WriteEndObject();
                }
            }
            w.WriteEndArray();

            // base data
            //
            w.WritePropertyName("data");
            w.WriteStartArray();
            foreach (var line in files["unicodedata.txt"].Split('\r', '\n'))
            {
                if (line.Trim().Length < 1) continue;

                var parts = line.Split(';');
                var code = int.Parse(parts[0], System.Globalization.NumberStyles.AllowHexSpecifier);

                bool include = true;

                if (filterBlocks)
                {
                    include = false;
                    foreach (var filter in filters)
                    {
                        if (code >= filter.Item1 && code <= filter.Item2)
                        {
                            include = true;
                            break;
                        }
                    }
                }

                if (include)
                {
                    w.WriteStartObject();
                    w.WritePropertyName("code");
                    w.WriteValue(code);
                    w.WritePropertyName("name");
                    w.WriteValue(parts[1]);
                    if (parts[10].Trim().Length > 0)
                    {
                        w.WritePropertyName("altName");
                        w.WriteValue(parts[10]);
                    }
                    w.WriteEndObject();
                }
            }
            w.WriteEndArray();



            w.WriteEndObject();
        }
    }
}
