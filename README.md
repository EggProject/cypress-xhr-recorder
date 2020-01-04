##Leírás:
...

###Telepítés:
`npm install @eggproject/cypress-xhr-recorder --save`<br/>
vagy<br/>
`yarn add @eggproject/cypress-xhr-recorder`

###Beállítás:
`cypress.json` fájlban:

```
{
    ...,
    "env": {
        ...,
        "xhr_recorder_recordMode": boolean
    }
}
```

Az `xhr_recorder_recordMode` cypress environment-et kell beállítani `true` vagy `false` értéket kell adnunk attól függően hogy record vagy play mod-ban akarjuk indítani a plugin-t. ([Cypress environment](https://docs.cypress.io/guides/guides/environment-variables.html#Option-1-configuration-file))

###Használat:

###Egyéb:
