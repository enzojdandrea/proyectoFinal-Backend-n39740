import fs from 'fs'

class productManager {
    id = 1
    constructor() {
        this.products = []
        this.path = 'products.json'
    }

    async loadProducts() {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8')
            if (products.length != 0) {
                this.products = JSON.parse(products)
                const lengt = this.products.length
                this.id = this.products[lengt - 1].id
            }
        } catch (error) {
            const products = await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            console.log(error)
        }

    }

    async addproduct(product) {
        await this.loadProducts()
        try {
            if (this.products.length != 0) {
                const { code } = product
                const productFind = this.products.find((product) => product.code === code);
                if (productFind) {
                    return ("porducto ya existente")
                }
                this.id = this.id + 1
            }
            this.products.push(
                {
                    ...product,
                    id: this.id
                })
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            return 'Producto agregado'
        }
        catch (error) {
            console.log(error)
        }
    }

    async getProducts() {
        const products = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(products)
    }

    async getProductsById(id) {
        const products = await fs.promises.readFile(this.path, 'utf-8')
        const productsParse = JSON.parse(products)
        const product = productsParse.find((prod) => prod.id === id);
        return product;
    }

    async updateProduct(id, newData) {
        const products = await fs.promises.readFile(this.path, 'utf-8')
        const productsParse = JSON.parse(products)

        const foundProduct = productsParse.find((prod) => {
            return prod.id === id
        })
        const codeProduct = productsParse.find((prod)=>{
            return prod.code===newData.code
        })
        if (!foundProduct||codeProduct) {
            throw Error(`No existe ningun producto con ID: ${id} o el codigo ${newData.code} ya existe`);
        }
        const indice = productsParse.findIndex((element,indice)=>{
            if(element.id===id){
                return true
            }
        })
        productsParse.splice(indice,1,{...newData,"id":id})
        await fs.promises.writeFile(this.path, JSON.stringify(productsParse))
    }

    async deleteProduct(id) {
        const products = await fs.promises.readFile(this.path, 'utf-8')
        const productsParse = JSON.parse(products)
        const newProducts = productsParse.filter((produ) => produ.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
    }
}

// module.exports = productsManager;
export default productManager