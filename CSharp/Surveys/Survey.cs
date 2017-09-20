using System.Collections.Generic;

namespace Surveys
{
    public class Survey
    {
        public Survey(string name)
        {
            Name = name;
            Questions = new List<Question>();
        }

        public int Id { get; }

        public string Name { get; }

        public List<Question> Questions { get; }
    }
}
