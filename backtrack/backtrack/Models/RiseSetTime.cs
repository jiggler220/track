using System;

namespace backtrack.Models
{
    public class RiseSetTime
    {
        public RiseSetTime(DateTime riseTime, DateTime setTime)
        {
            RiseTime = riseTime;
            SetTime = setTime;
        }

        public DateTime RiseTime { get; set; }

        public DateTime SetTime { get; set; }
    }
}
