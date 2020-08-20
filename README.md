# Ônibus SP

https://heldersrvio.github.io/sp-buses-dashboard/

## Introdução

Dashboard do transporte público na cidade de São Paulo. Um projeto feito para o programa de estágio da Aiko baseado na [API Olho Vivo](http://www.sptrans.com.br/desenvolvedores/api-do-olho-vivo-guia-de-referencia/documentacao-api/). Também foram usadas as bibliotecas [Leaflet](https://leafletjs.com) e [Leaflet Routing Machine](https://www.liedman.net/leaflet-routing-machine/) para renderizar mapas e rotas.

O aplicativo foi escrito usando ReactJS e mostra informações sobre corredores de ônibus, linhas, veículos e paradas de forma compreensiva ao usuário.

## Como Usar

![Interface da aplicação](https://imgur.com/mXcrNyS)

A dashboard é composta de três seções: linhas, corredores e o mapa. No canto direito da barra do topo da página, encontra-se um filtro que reorganiza a dashboard por exibir apenas as seções que o usuário selecionar. Tanto o mapa, como as linhas e os corredores podem ser omitidos pelo filtro.

O rodapé da página informa ao usuário quando ocorreu a última atualização ou se houve algum erro durante o processo de coleta de dados.

### Linhas

A seção de linhas é baseada em consultas: não é exibido nenhuma informação enquanto o usuário não digitar algo no campo de pesquisa. Quando o usuário pesquisa algum termo, os resultados são atualizados automaticamente com todas as linhas que se encaixam na pesquisa.

Cada linha possui uma seção de detalhes, que pode ser exibida ao se clicar em seu nome. Os detalhes contêm código, letreiro, sentido, além de informar se a linha é ou não circular e se é 'Base' ou 'Atendimento'.

### Corredores

A seção de corredores contêm todos os corredores que foram fornecidos pela última atualização. Para ver as paradas que compõem um determinado corredor, basta clicar em "Mostrar paradas".

### Mapa

O mapa é responsável por mostrar ao usuário as últimas informações sobre veículos e paradas, que são representados por ícones ilustrativos. O estilo do mapa pode ser alterado por meio do menu que se encontra em seu canto superior direito (os estilos são 'Padrão', 'Escuro', 'Terreno' e 'Satélite'). O usuário também pode escolher esconder as paradas, os veículos, ou os dois.

Para ver o código e mais informações a respeito de um veículo ou parada, o usuário deve clicar no ícone correspondente. As paradas também contam com a opção de listar todos os veículos para os quais se tem previsão de chegada àquela parada e, uma vez exibida tal lista, o usuário pode clicar em um dos veículos para mostrar uma possível rota (calculada usando a Leaflet Routing Machine) que o veículo fará para chegar à parada.

Por último, o mapa também conta com uma barra de pesquisa. O usuário pode pesquisar tanto paradas como veículos e clicar em um dos resultados para ser direcionado ao local onde aquele veículo ou parada está.

## Organização do Projeto

O projeto foi escrito, em sua maior parte, usando o framework ReactJS. O arquivo 'raiz' do projeto é index.js (localizado no diretório src), que tem a função de renderizar o componente React localizado em App.js, que se trata do componente principal.

Além dos componentes React, as funções de autenticação e de comunicação por meio da API do Olho Vivo foram implementadas no arquivo OlhoVivo.js.

### Componentes

Tirando o componente principal em App.js, o projeto conta com 7 componentes React: Filter, Header, Footer, LanesBox, LinesBox, SearchBar e Map, sendo que Filter é 'filho' de Header e SearchBar, de Map.

#### Filter

Trata-se do filtro usado na barra do topo da aplicação. O filtro é responsável por selecionar o layout desejado da dashboard (mostrando ou omitindo alguma(s) das três seções). As opções foram implementadas por meio de estados React, que causam uma chamada da função 'updateDashboard' (passada como 'prop' pelo Header e responsável por atualizar o layout da dashboard) quando são alterados.

### Header

A barra do topo da aplicação, que exibe o título e o filtro. Recebe do component principal em App.js a função de atualização da dashboard, que é passada para Filter.

### Footer

O rodapé da página, no qual se dispõem informações sobre a autoria, além de feedback a respeito da coleta de dados: um ícone animado que indica que os dados estão sendo carregados, uma mensagem que informa ao usuário há quanto tempo foi atualizada a aplicação (a atualização ocorre automaticamente a cada 5 minutos), ou uma mensagem de erro.

O feedback provém dos 'props' que o componente recebe de App.js.

### LanesBox

O componente responsável pela seção de corredores. Recebe de App.js uma lista de corredores, além de uma função assíncrona responsável por 'colher' todas as paradas de um determinado corredor.

As paradas já carregadas e suas visibilidades são controladas por estados React.

### LinesBox

O componente responsável pela seção de linhas. Recebe de App.js uma função assíncrona que pesquisa por linhas correspondentes ao que foi digitado pelo usuário no campo de busca.

As linhas já carregadas e aquelas que foram clicadas (ou seja, estão exibindo seus detalhes) são controladas por estados React.

### SearchBar

A barra de pesquisa do mapa. Recebe como 'props' uma função para atualizar o mapa (isto é, levar o usuário ao ponto em que se localiza o resultado em que ele clicou) e uma função de coleta de dados (que faz uma busca tanto de veículos como de paradas).


### Map

O mapa, renderizado com a ajuda da bibiloteca Leaflet, que dispõe as posições de todos os veículos e paradas.

Como já mencionado, o mapa também possui a capacidade de calcular e exibir linhas de rotas entre ônibus e paradas. Para visualizar uma rota, o usuário deve clicar em 'Mostrar previsões de chegada' e, em seguida, em uma das opções de veículos exibidas.

## Testes

Os testes (localizados no diretório tests dentro do diretório components) foram divididos por componente. Para testar usaram-se as dependências 'Enzyme' e 'Jest'. Foram feitas checagens de montagem sem erros, atualização de estado dos componentes, corretividade das informações exibidas e das classes HTML.

## Estilos

A estilização do aplicativo (em CSS) encontra-se nos dois diretórios styles (um dentro de src e o outro dentro de components). Fez-se amplo uso de 'flexbox', o que permitiu um layout flexível da dashboard, de acordo com o que o usuário selecionou no filtro.

Usaram-se media queries para tornar a experiência de usuário agradável também em dispositivos menores. Nesse caso, a página segue uma única direção vertical, diferentemente da experiência de telas maiores, que dispõe o mapa e as outras duas seções em um espaço horizontal. Adicionaram-se, também, alguns pixels de acolchoamento nas bordas da dashboard, para que o usuário pudesse rolar a página e as seções individuais separadamente.

