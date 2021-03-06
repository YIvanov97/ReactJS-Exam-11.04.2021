import { FaTrashAlt } from 'react-icons/fa';

const ArticlesData = props => {
    return(
        props.products.map(product => {
            return (   
                <tr>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}$</td>
                    <td>
                        <span className="removeProduct--Container" onClick={() => {props.remove(product._id); props.notify()}}>
                            <FaTrashAlt className="remove--Icon" />
                        </span>
                    </td>
                </tr>
            )
        }).reverse()
    )
}

export default ArticlesData;