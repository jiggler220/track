using System.Runtime.Serialization.Formatters.Binary;
using System.Runtime.Serialization;

namespace backtrack.Utils
{
    public static class UtilFunctions
    {
        // Function to compare two byte arrays for equality
        public static bool ArraysAreEqual(byte[] arr1, byte[] arr2)
        {
            if (arr1.Length != arr2.Length)
            {
                return false;
            }

            for (int i = 0; i < arr1.Length; i++)
            {
                if (arr1[i] != arr2[i])
                {
                    return false;
                }
            }

            return true;
        }

        public static T DeepClone<T>(T obj)
        {
            if (obj is null)
            {
                throw new ArgumentNullException(nameof(obj));
            }

            // Create a new instance of the object
            T newObject = (T)Activator.CreateInstance(obj.GetType());

            // Copy the values of fields and properties
            foreach (var field in obj.GetType().GetFields())
            {
                field.SetValue(newObject, field.GetValue(obj));
            }

            foreach (var property in obj.GetType().GetProperties())
            {
                if (property.CanRead && property.CanWrite)
                {
                    property.SetValue(newObject, property.GetValue(obj));
                }
            }

            return newObject;
        }
    }
}
