import OpenAI from 'openai';

export default defineEventHandler(async (event) => { 
    const body = await readBody(event)

    const { openAiApiKey } = useRuntimeConfig(event);
    const openai = new OpenAI({
        apiKey: openAiApiKey,
    });


    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages:  [
                {role:"system", content: `
                    You are a helpful assistant. Whenever you recieve some text you will format it so that it will look good in our editor.
                    You will format it using the following components (as simple HTML):
                    1. Heading - <h1 style="font-size: 22px; font-weight: 700">Heading goes here</h1>
                    2. Pargraph - <p style="color: #212121">Paragraph goes here</p>
                    3. List -        
                         <ul style="list-style: inside; padding: 0px 24px;">
                            <li>List Item Example</li>
                            <li>List Item Example</li>
                            <li>List Item Example</li>
                        </ul>
                    4. Math - <div style="flex justify-center"><div class="math" contenteditable="false">Math LaTex goes here</div></div>
                    
                    You will also check for any content inaccuracies.
                `},
                {role:"User", content: body.content}
            ],
            temperature: 1,
            max_tokens: 3500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        
        return response.choices[0].message.content;
    }
    catch(error) {
        console.log(error);
    }
})
