using backtrack.Utils;

namespace backtrack.Models.Coordinates
{
    public class GeodeticCoordinate : Coordinate
    {
        public GeodeticCoordinate(double latitude, double longitude, double altitude)
        {
            this.X = latitude;
            this.Y = longitude;
            this.Z = altitude;
        }

        public double X { get; set; }
        public double Y { get; set; }
        public double Z { get; set; }

        // Convert Lat, Lon, Altitude to Earth-Centered-Earth-Fixed (ECEF)
        // From https://danceswithcode.net/engineeringnotes/geodetic_to_ecef/geodetic_to_ecef.html
        // https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#From_geodetic_to_ECEF_coordinates
        public ECEFCoordinate GeodeticToECEF()
        {
            double latitude = this.X * Constants.DEG2RAD;
            double longitude = this.Y * Constants.DEG2RAD;

            double n = Constants.EARTH_RADIUS / Math.Sqrt(1 - Constants.E2 * Math.Sin(latitude) * Math.Sin(latitude));
            double ecefX = (n + this.Z) * Math.Cos(latitude) * Math.Cos(longitude);
            double ecefY = (n + this.Z) * Math.Cos(latitude) * Math.Sin(longitude);
            double ecefZ = (n * (1 - Constants.E2) + this.Z) * Math.Sin(latitude);

            return new ECEFCoordinate(ecefX, ecefY, ecefZ);
        }
    }
}
