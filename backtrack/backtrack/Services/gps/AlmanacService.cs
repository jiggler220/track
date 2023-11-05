using backtrack.Models;
using backtrack.Utils;
using System.Collections.Generic;
using System.Text;

namespace backtrack.Services.gps
{
    public class AlmanacService : GeneralService
    {
        private readonly AlmanacConversions conversions = new AlmanacConversions();
        private readonly AppConfig appConfig = new AppConfig();

        public AlmanacService()
        {
            this.currentSem = "";
            this.currentYuma = "";
            this.allSvs = new Dictionary<int, Satellite>();
        }

        public string currentSem { get; set; }
        public string currentYuma { get; set; }
        public Dictionary<int, Satellite> allSvs { get; set; }

        public async Task UpdateAlmanacAsync(AlmanacConversions.Type type)
        {

            string url = "";
            string oldContent = "";

            switch (type)
            {
                case AlmanacConversions.Type.SEM:
                    url = Constants.SemUrl;
                    oldContent = this.currentSem;
                    break;
                case AlmanacConversions.Type.YUMA:
                    url = Constants.YumaUrl;
                    oldContent = this.currentYuma;
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
                        string newContent = await response.Content.ReadAsStringAsync();

                        if (oldContent == newContent)
                        {
                            return;
                        }

                        else
                        {
                            switch (type)
                            {
                                case AlmanacConversions.Type.SEM:
                                    this.currentSem = newContent;
                                    this.allSvs = conversions.SEMToSVConstellation(this.currentSem);
                                    break;
                                case AlmanacConversions.Type.YUMA:
                                    this.currentYuma = newContent;
                                    this.allSvs = conversions.YumaFileToSVConstellation(this.currentYuma);
                                    break;
                                default:
                                    throw new Exception("Invalid Alamanac Type");
                            }
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

        public void UpdateConstellation(AlmanacConversions.Type alType, DateTime referenceTime)
        {
            ComputeConstellationCoords(referenceTime);
        }

        public Dictionary<int, Satellite> ComputeConstellationCoords(DateTime dateTime)
        {
            // Deep copy the dictionary
            Dictionary<int, Satellite> deepAllSvs = new Dictionary<int, Satellite>(this.allSvs);

            foreach (var sat in deepAllSvs)
            {
                sat.Value.EcefCoord = sat.Value.ComputeCoordinates(dateTime, appConfig);
            }

            return deepAllSvs;
        }
    }
}
