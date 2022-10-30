import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UpdateCarForm from '../forms/UpdateCarForm'
import RemoveButton from '../button/RemoveButton'
import { useState } from 'react'
import { formatCurrency } from '../../formatCurrency'

const getStyles = () => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    }
})

const CarItems = (props) => {

    const styles = getStyles()
    const [id] = useState(props.id)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [year, setYear] = useState(props.year)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)
    const [editCar, setEditCar] = useState(false)

    const updateCar = () => {
        setEditCar(!editCar)
    }

    const updateVars = (variable, value) => {
        switch (variable) {
            case 'make':
                setMake(value)
                break
            case 'model':
                setModel(value)
                break
            case 'year':
                setYear(parseInt(value))
                break
            case 'price':
                setPrice(parseFloat(value))
                break
            case 'personId':
                setPersonId(value)
                break
            default:
                break
        }
    }

    return (
        <Card style={styles.container} key={props.index} type='inner' title={`${props.make} ${props.model}`}>
            <div>Year: {props.year}</div>
            <div>Price: {formatCurrency(props.price)}</div>
            <div>
                <EditOutlined key='edit' onClick={updateCar} />
                <RemoveButton carId={props.id} />
            </div>
            {editCar ? (
                <UpdateCarForm
                    id={id}
                    make={make}
                    model={model}
                    year={year}
                    price={price}
                    onBtnClick={updateCar}
                    personId={personId}
                    updateVars={updateVars}
                    prevOwner={personId}
                />) : null}
        </Card>
    )
}

export default CarItems 