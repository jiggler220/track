namespace backtrack
{
    public class AppConfig : IAppConfig
    {
        public AppConfig()
        {
            SetLeapSeconds(18);
        }

        public AppConfig(int leapSeconds)
        {
            SetLeapSeconds(leapSeconds);
        }

        public int LeapSeconds { get; private set; }

        public void SetLeapSeconds(int  leapSeconds)
        {
            this.LeapSeconds = leapSeconds;
        }

    }
}
