using System.Collections.Generic;

namespace Surveys
{
    public class Question
    {
        public Question(string text)
        {
            Text = text;
            Answers = new List<Answer>();
        }

        public int Id { get; }

        public string Text { get; }

        public List<Answer> Answers { get; }
    }
}
