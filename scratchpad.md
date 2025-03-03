ollama rest api req


https://19j16ln475i3y6-11434.proxy.runpod.net/

curl https://19j16ln475i3y6-11434.proxy.runpod.net/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "llama3.2:3b",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "Hello!"
            }
        ]
    }'


local system terminal output of running the command 
```

aj@hbdev:~$ curl https://19j16ln475i3y6-11434.proxy.runpod.net/v1/chat/completions     -H "Content-Type: application/json"     -d '{
        "model": "llama3.2:3b",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "Hello!"
            }
        ]
    }'
{"id":"chatcmpl-401","object":"chat.completion","created":1740565518,"model":"llama3.2:3b","system_fingerprint":"fp_ollama","choices":[{"index":0,"message":{"role":"assistant","content":"Hello! It's nice to meet you. Is there something I can help you with or would you like to chat?"},"finish_reason":"stop"}],"usage":{"prompt_tokens":33,"completion_tokens":25,"total_tokens":58}}



ollama docs: openai api compatibility

```

import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: 'https://19j16ln475i3y6-11434.proxy.runpod.net/v1',
  apiKey: 'ollama', // required but unused
})

const completion = await openai.chat.completions.create({
  model: 'llama3.2:3b',
  messages: [{ role: 'user', content: 'Why is the sky blue?' }],
})

console.log(completion.choices[0].message.content)