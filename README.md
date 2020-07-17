# Estralo
Programa criado para detectar estralos de dedos e ligar/desligar eletrônicos com o protocolo MQTT.

## Instalação

Este projeto ainda não possui builds disponíveis para download direto, se você gostaria de fazer sua propria build basta clonar o repositório e utilizar o electron-packager.

```bash
git clone https://github.com/ReinaldoAssis/Estralo.git
```
```bash
electron-packager ./ --icon=./smarthome.ico --asar --platform=win32 --arch=ia32 --overwrite
```
Para mais informações em como utilizar o electron-packager, clique [aqui](https://github.com/electron/electron-packager#user-content-installation)

## Configuraçao

![Configuração em branco](https://i.ibb.co/DVHffVn/image.png)

## Utilização

```python
import foobar

foobar.pluralize('word') # returns 'words'
foobar.pluralize('goose') # returns 'geese'
foobar.singularize('phenomena') # returns 'phenomenon'
```

## Contribuições
Pull requests são bem-vindas! Para mudanças mais significativas, por favor abra um "issue" primeiro para discutir o que você gostaria de alterar.

Please make sure to update tests as appropriate.

## Licença
Ler arquivo "LICENSE".
