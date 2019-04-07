using System.Collections.Generic;
using System.Dynamic;

namespace Core.Extensions
{
    public static class DynamicExtensions
    {
        public static bool HasProperty(this ExpandoObject obj, string key)
        {
            return ((IDictionary<string, object>)obj).ContainsKey(key);
        }
    }
}
