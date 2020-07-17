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

![Configuração em branco](https://i.ibb.co/Fqw7H9w/image.png)

Quase toda a configuração é voltada para o protocolo MQTT, você precisa especificar o seu broker, a porta, usuário e senha (se houver) e o tópico para o eletrônico que você deseja escrever. *ATENÇÃO:* O programa escreve "ON" e "OFF" no tópico, então seu dispositivo precisa ser capaz de reconhece-los.

A checkbox "Iniciar o programa ao abrir" é auto explicativa, se estiver marcada ao abrir o programa ele iniciará o reconhecimento.

O slide azul vai de 0 até 0.75, quanto maior o valor mais vezes o programa tentará reconhecer sons. O recomendado é utiliza-lo em 0.45 ou 0.50.

## Utilização
![Demonstração](https://i.ibb.co/vxr42DM/ezgif-com-add-text.gif)
Após a configuração é só curtir seus novos poderes!

## Contribuições
Pull requests são bem-vindas! Para mudanças mais significativas, por favor abra um "issue" primeiro para discutir o que você gostaria de alterar.

## Licença
Ler arquivo "LICENSE".
