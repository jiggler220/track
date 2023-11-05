using backtrack.Models.gps;
using backtrack.Utils;
using System.Text;

namespace backtrack.Services.gps
{
    public class AlmanacService
    {
        public async Task<string> GetMostRecentAlmanacAsync(AlmanacType.Type type)
        {

            string url = "";
            string cachedFilePath = "";

            switch (type)
            {
                case AlmanacType.Type.SEM:
                    url = Constants.SemUrl;
                    cachedFilePath = Constants.cachedSemFilePath;
                    break;
                case AlmanacType.Type.YUMA:
                    url = Constants.YumaUrl;
                    cachedFilePath = Constants.cachedYumaFilePath;
                    break;
                default:
                    throw new Exception("Invalid Alamanac Type");
            }


            using (HttpClient client = new HttpClient())
            {
                try
                {
                    // Download the new file
                    HttpResponseMessage response = await client.GetAsync(url);

                    if (response.IsSuccessStatusCode)
                    {
                        // Read the content as a byte array
                        byte[] newContent = await response.Content.ReadAsByteArrayAsync();

                        // Check if a cached file exists
                        if (File.Exists(cachedFilePath))
                        {
                            // Read the cached content as a byte array
                            byte[] cachedContent = File.ReadAllBytes(cachedFilePath);

                            // Compare the new content with the cached content
                            if (UtilFunctions.ArraysAreEqual(newContent, cachedContent))
                            {
                                Console.WriteLine("The downloaded file is the same as the cached one.");
                                return Encoding.UTF8.GetString(cachedContent);
                            }
                            else
                            {
                                // Update the cached file with the new content
                                File.WriteAllBytes(cachedFilePath, newContent);
                                Console.WriteLine("The downloaded file has been updated and cached.");
                                return Encoding.UTF8.GetString(newContent);

                            }
                        }
                        else
                        {
                            // Cache the new file since there's no cached version
                            File.WriteAllBytes(cachedFilePath, newContent);
                            Console.WriteLine("The downloaded file has been cached.");
                            return Encoding.UTF8.GetString(newContent);
                        }
                    }
                    else
                    {
                        throw new Exception($"Failed to download the file. Status code: {response.StatusCode}");
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception($"An error occurred: {ex.Message}");
                }
            }
        }
    }
}
