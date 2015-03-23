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
            var w = new JsonTextWriter(Console.Out);
            w.Indentation = 2;
            w.Formatting = Formatting.Indented;
            var files = Directory.EnumerateFiles(args.Length > 0 ? args[0] : ".", "*.txt").ToDictionary(f=>Path.GetFileName(f).ToLowerInvariant(), f=>File.ReadAllText(f));
            w.WriteStartObject();
            
            // base data
            //
            w.WritePropertyName("data");
            w.WriteStartArray();
            foreach (var line in files["unicodedata.txt"].Split('\r', '\n'))
            {
                if (line.Trim().Length < 1) continue;

                var parts = line.Split(';');
                w.WriteStartObject();
                w.WritePropertyName("code");
                w.WriteValue(int.Parse(parts[0], System.Globalization.NumberStyles.AllowHexSpecifier));
                w.WritePropertyName("name");
                w.WriteValue(parts[1]);
                if (parts[10].Trim().Length > 0)
                {
                    w.WritePropertyName("altName");
                    w.WriteValue(parts[10]);
                }
                w.WriteEndObject();
            }
            w.WriteEndArray();

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

                w.WriteStartObject();
                w.WritePropertyName("start");
                w.WriteValue(int.Parse(range[0], System.Globalization.NumberStyles.AllowHexSpecifier));
                w.WritePropertyName("end");
                w.WriteValue(int.Parse(range[1], System.Globalization.NumberStyles.AllowHexSpecifier));
                w.WritePropertyName("name");
                w.WriteValue(parts[1].Trim());
                w.WriteEndObject();
            }
            w.WriteEndArray();


            w.WriteEndObject();
        }
    }
}
