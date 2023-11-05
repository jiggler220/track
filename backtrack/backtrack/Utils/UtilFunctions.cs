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
    }
}
