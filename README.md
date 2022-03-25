# BALANCE_APP - NODE.JS
*API Rest para empresas que trabalham com e-commerce, com 2 objetivos principais:*
Sugerir o preço de venda de um produto em cada marketplace ou loja virtual, com base em todos os custos do produto, e também das taxas e comissões dos marketplaces.
Calcular o lucro obtido com as vendas, já descontando todos os custos, taxas e comissões.

API desenvolvida para praticar os conhecimentos adquiridos em NodeJS.

# Cadastro de usuário
**RF**
Deve ser possível cadastrar um novo usuário.

**RN**
Não deve ser possível cadastrar um usuário com e-mail já existente.

# Para todos os casos abaixo, o usuário precisa estar logado na aplicação

# Cadastro de produto
**RF**
Deve ser possível cadastrar um novo produto.

**RN**
Não deve ser possível cadastrar um produto com o código interno já existente para o usuário que estiver realizando o cadastro.

# Listagem de produtos
**RF**
Deve ser possível listar todos os produtos do usuário.

**RN**
Não deve ser possível listar os produtos de outro usuário ou de usuário inexistente.

# Edição de produto
**RF**
Deve ser possível alterar os dados (internal_code, name, unit, brand e inventory) de um produto.

**RN**
Não deve ser possível alterar os dados de um produto não existente.
Não deve ser possível alterar o código interno para um código interno já existente para o usuário que estiver realizando a alteração.

# Exclusão de produto
**RF**
Deve ser possível excluir um produto.

**RN**
Não deve ser possível excluir um produto não existente.

# Cadastro de custo do produto
**RF**
Deve ser possível cadastrar um novo custo para o produto.

**RN**
Não deve ser possível cadastrar um novo custo para um produto não existente.
O custo precisa ser maior do que zero.
O cadastro do novo custo deve ser feito pelo mesmo usuário a qual o produto pertence.
Ao finalizar o cadastro, é necessário atualizar o custo total do produto, somando o valor desse novo custo.
Se o produto pertencer a um ou mais kits, é necessário atualizar o custo total dos *main_products* aos quais esse produto pertence, somando o valor desse novo custo.

# Listagem de custos do produto
**RF**
Deve ser possível listar todos os custos do produto.

**RN**
Não deve ser possível listar os custos de um produto que não existe.
A requisição da listagem deve ser feita pelo mesmo usuário a qual o produto pertence.

# Edição de custos do produto
**RF**
Deve ser possível alterar o nome e o valor do custo do produto.

**RN**
Não deve ser possível alterar os dados de um produto que não existe.
A alteração do custo deve ser feita pelo mesmo usuário a qual o produto pertence.
O custo precisa ser maior do que zero.
É necessário atualizar o custo total do produto (que engloba todos os custos cadastrados), substituindo o custo alterado.
Se o produto pertencer a um ou mais kits, é necessário atualizar o custo total dos *main_products* aos quais esse produto pertence, alterando com o valor desse novo custo.


# Exclusão de custos do produto
**RF**
Deve ser possível excluir um custo do produto.

**RN**
Não deve ser possível excluir um custo de um produto que não existe.
A exclusão do custo deve ser feita pelo mesmo usuário a qual o produto pertence.
É necessário atualizar o custo total do produto, subtraindo o custo excluído.
Se o produto pertencer a um ou mais kits, é necessário atualizar o custo total dos *main_products* aos quais esse produto pertence, subtraindo o valor desse custo.


# Cadastro de Kit Product
*Kit Product é o nome que dei para cadastrar um produto que pertence a um Kit, então ele precisa ter o main_product, que é o "Produto pai" e recebe o kit_item, que é o produto que vai fazer parte do kit, juntamente com a quantidade desse kit_item. Exemplo: main_product = kit com 3 canecas; kit_item = caneca; quantidade = 3;*

**RF**
Deve ser possível cadastrar um kit product.

**RN**
Não deve ser possível cadastrar um kit product com um *(main_product)* que não existe.
Não deve ser possível cadastrar um kit product com um *(kit_item)* que não existe.
Não deve ser possível cadastrar um kit product no qual o *main_product* e o *kit_item* são o mesmo produto.
Não deve ser possível cadastrar uma quantidade igual ou menor a zero no kit product.
O cadastro do kit product deve ser feito pelo mesmo usuário a qual *main_product* e o *kit_item* pertencem.
É necessário atualizar o custo total do *main_product*, somando o custo total do *kit_item* multiplicado pela quantidade desse *kit_item*.

# Exclusão de Kit Product
**RF**
Deve ser possível excluir um kit product.

**RN**
Não deve ser possível excluir um kit product que não existe.
A exclusão do kit product deve ser feita pelo mesmo usuário a qual o *main_product* e o *kit_item* pertencem.
É necessário atualizar o custo total do *main_product*, subtraindo o custo total do *kit_item* multiplicado pela quantidade desse *kit_item*.

# Cadastro de Marketplace
**RF**
Deve ser possível cadastrar um marketplace.

**RN**
Não deve ser possível cadastrar um marketplace para um usuário que não existe.

# Edição de Marketplace
**RF**
Deve ser possível alterar o nome do marketplace.

**RN**
Não deve ser possível alterar o nome de um marketplace que não existe.
A alteração do marketplace deve ser feita pelo mesmo usuário a qual o marketplace pertence.

# Exclusão de Marketplace
**RF**
Deve ser possível excluir um marketplace.

**RN**
Não deve ser possível excluir um marketplace que não existe.
A exclusão do marketplace deve ser feita pelo mesmo usuário a qual o marketplace pertence.

# Cadastro de preço de venda
**RF**
Deve ser possível cadastrar um preço de venda.

**RN**
Não deve ser possível cadastrar um preço de venda para um produto que não existe.
Não deve ser possível cadastrar um preço de venda para um marketplace que não existe.
Não deve ser possível cadastrar um preço de venda quando já existe um para o mesmo produto e marketplace.
O cadastro do preço de venda deve ser feito pelo mesmo usuário a qual o produto pertence.
Os valores inseridos pelo usuário devem ser iguais ou maiores que zero.
Deve retornar o objeto do preço de venda, juntamente com o preço de venda sugerido e o lucro real.

# Listagem de preços de venda
**RF**
Deve ser possível listar os preços de venda por produto.

**RN**
Não deve ser possível listar os preços de venda de um produto que não existe.
A requisição da listagem deve ser feita pelo mesmo usuário a qual o produto pertence.
Deve retornar os objetos dos preços de venda, juntamente com os preços de venda sugeridos e lucro real para cada produto.

# Edição de preço de venda
**RF**
Deve ser possível editar um preço de venda.

**RN**
Não deve ser possível editar um preço de venda que não existe.
Os valores inseridos pelo usuário devem ser iguais ou maiores que zero.
A alteração do preço de venda deve ser feito pelo mesmo usuário a qual o produto pertence.

# Exclusão de preço de venda
**RF**
Deve ser possível excluir um preço de venda.

**RN**
Não deve ser possível excluir um preço de venda que não existe.
A exclusão do preço de venda deve ser feito pelo mesmo usuário a qual o produto pertence.

# Cadastro de venda
**RF**
Deve ser possível cadastrar uma venda.

**RN**
Não deve ser possível cadastrar uma venda que não possua um preço de venda criado para o produto e marketplace que o usuário inserir/selecionar.
Não deve ser possível cadastrar uma venda para os mesmos (produto, marketplace e mês) combinados.
Deve ser possível calcular o lucro obtido com essa venda.
O número do mês deve estar entre 1 e 12.
A quantidade informada deve ser maior que zero.
Deve atualizar o estoque do produto, reduzindo a quantidade que foi cadastrada na venda.
O lucro cadastrado dessa venda irá se basear no preço de venda praticado no momento do cadastro da venda, e também no custo total do produto praticado no momento do cadastro da venda, portanto não deverá sofrer alterações quando o preço de venda for alterado, ou quando o custo do produto for alterado.

# Listagem de vendas
**RF**
Deve ser possível listar todas as vendas do usuário.
Deve ser possível listar todas as vendas do usuário por mês e/ou produto e/ou marketplace.

**RN**
Deve retornar o cálculo do lucro total com base nas vendas que forem listadas.
O número do mês, se for passado, deve estar entre 1 e 12.

# Alteração de venda
**RF**
Deve ser possível alterar a quantidade de produtos vendidos

**RN**
Não deve ser possível alterar uma venda que não existe.
A alteração da venda deve ser feita pelo mesmo usuário a qual o produto pertence.
A quantidade informada deve ser maior que zero.
Deve atualizar o estoque do produto.
Deve atualizar o lucro da venda, com base apenas no lucro que já estiver cadastrado, sem consultar alterações nos preços de venda e nos custos do produto.

# Exclusão de venda
**RF**
Deve ser possível excluir uma venda.

**RN**
Não deve ser possível excluir uma venda que não existe.
A exclusão da venda deve ser feita pelo mesmo usuário a qual o produto pertence.











