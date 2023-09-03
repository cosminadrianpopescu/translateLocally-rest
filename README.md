# translateLocally-rest

Exposes [translateLocally](https://github.com/XapaJIaMnu/translateLocally) via
a REST api.

# Why?

I personally use it to expose an instance of `translateLocally` from my server
and access it from my `Android` phone by my e-mail client to translate
messages or by my own `Android` translation application.

There might also be other use cases.

# Installation

```bash
git clone https://github.com/cosminadrianpopescu/translateLocally-rest
cd translateLocally-rest
npm run build
```

# Running

```bash
cd translateLocally-rest/dist
export TL_PATH=/path/to/translateLocally
export TL_TOKEN=my-token # (optional) only if exposed via internet
node ./index.js
```

*Note*: if you only use it from localhost, then you don't really need to set
the security token. The token is if you use it via an internet connection.

# Docker

```bash
cd translateLocally-rest
docker build -t translate-locally-rest .
docker run -v /path/to/your/models/folder:/root/.config/translateLocally -p 127.0.0.1:12345:12345/tcp
```

# How to use (API)

* Get the list of installed models:

```bash
curl -H 'x-tl-token: my-token' http://localhost:12345/api/installed-models
```

* Get the list of available models:

```bash
curl -H 'x-tl-token: my-token' http://localhost:12345/api/available-models
```

* Translate a text:

```bash
curl  -X POST http://localhost:12345/api/translate -d '{"isHtml":true,"modelId":"de-en-base","txt":"<text-to-translate>"}'
```
