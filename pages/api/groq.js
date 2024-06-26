
const Groq = require("groq-sdk");
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
export default async function handler(req, res) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant ready to serve."
                },
                {
                    role: "user",
                    content: req.body.message
                }
            ],
            model: req.body.model 
        });
        console.log(completion.choices[0]?.message?.content || "");
        res.status(200).json({ output: completion.choices[0]?.message?.content || "!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}


