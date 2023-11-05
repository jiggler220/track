using backtrack.Models.Coordinates;
using backtrack.Services.gps;

namespace backtrack.Models.gps
{
    public class GpsConstellation
    {
        private readonly AlmanacConversions almanacConversions = new AlmanacConversions();
        public GpsConstellation(DateTime referenceTime, string fileName)
        {
            this.RecentReferenceTime = referenceTime;
            this.AppConfig = new AppConfig();
            this.AllSVs = PopulateSVsFromAlmanac(fileName);
            SetConstellationCoords(this.AllSVs, this.RecentReferenceTime);
        }

        public void UpdateAlmanac(string fileName)
        {
            Dictionary<int, Satellite> updatedSvs = PopulateSVsFromAlmanac(fileName);
            foreach (var sat in updatedSvs)
            {
                if (AllSVs.ContainsKey(sat.Key))
                {
                    AllSVs[sat.Key] = sat.Value;
                }
            }
        }

        private Dictionary<int, Satellite> PopulateSVsFromAlmanac(string fileName)
        {
            FileInfo fileInfo = new FileInfo(fileName);

            //YUMA
            if (fileInfo.Extension == ".alm")
            {
                return almanacConversions.YumaFileToSVConstellation(fileName);
            }

            //SEM
            else if (fileInfo.Extension == ".al3")
            {
                return almanacConversions.SEMToSVConstellation(fileName);
            }

            else
            {
                throw new Exception("Invalid File Format");
            }
        }

        public void ComputeConstellationCoords(DateTime dateTime)
        {
            foreach (var sat in AllSVs)
            {
                sat.Value.ComputeCoordinates(dateTime, this.AppConfig);
            }
        }

        public void SetConstellationCoords(Dictionary<int, Satellite> svs, DateTime dateTime)
        {
            foreach (var sat in svs)
            {
                sat.Value.EcefCoord = sat.Value.ComputeCoordinates(dateTime, this.AppConfig);
            }
        }

        public Dictionary<int, Dictionary<DateTime, ECEFCoordinate>> ComputeConstellationECEFCoordsOverGivenPeriod(DateTime startDate, DateTime endDate)
        {
            Dictionary<int, Dictionary<DateTime, ECEFCoordinate>> ecefPeriodCoords = new Dictionary<int, Dictionary<DateTime, ECEFCoordinate>>();
            foreach (var sat in AllSVs)
            {
                Dictionary<DateTime, ECEFCoordinate> ecefDict = new Dictionary<DateTime, ECEFCoordinate>();
                DateTime tempStartDate = startDate;
                while (tempStartDate <= endDate)
                {
                    ECEFCoordinate ecefCoord = sat.Value.ComputeCoordinates(startDate, this.AppConfig);
                    ecefDict.Add(tempStartDate, ecefCoord);
                    tempStartDate = tempStartDate.AddSeconds(1);
                }
                ecefPeriodCoords.Add(sat.Key, ecefDict);
            }

            return ecefPeriodCoords;
        }

        public Dictionary<int, Dictionary<DateTime, GeodeticCoordinate>> ComputeConstellationGeoCoordsOverGivenPeriod(DateTime startDate, DateTime endDate)
        {
            Dictionary<int, Dictionary<DateTime, GeodeticCoordinate>> geoPeriodCoords = new Dictionary<int, Dictionary<DateTime, GeodeticCoordinate>>();
            foreach (var sat in AllSVs)
            {
                Dictionary<DateTime, GeodeticCoordinate> ecefDict = new Dictionary<DateTime, GeodeticCoordinate>();
                DateTime tempStartDate = startDate;
                while (tempStartDate <= endDate)
                {
                    GeodeticCoordinate geoCoord = sat.Value.ComputeCoordinates(startDate, this.AppConfig).ECEFToGeodetic();
                    ecefDict.Add(tempStartDate, geoCoord);
                    tempStartDate = tempStartDate.AddSeconds(1);
                }
                geoPeriodCoords.Add(sat.Key, ecefDict);
            }

            return geoPeriodCoords;
        }

        public Dictionary<int, Satellite> AllSVs { get; set; }

        public DateTime RecentReferenceTime { get; set; }

        public AppConfig AppConfig { get; set; }
    }
}
