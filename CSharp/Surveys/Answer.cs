namespace Surveys
{
    public class Answer
    {
        public Answer(string text)
        {
            Text = text;
        }

        public int Id { get; }

        public string Text { get; }
    }
}
