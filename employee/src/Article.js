const ArticlesData = props => {
    return(
        props.products.map(product => {
            return (   
                <tr>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}$</td>
                </tr>
            )
        }).reverse()
    )
}

export default ArticlesData;