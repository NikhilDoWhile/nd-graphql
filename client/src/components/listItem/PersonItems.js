import { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UpdatePersonForm from '../forms/UpdatePersonForm'
import RemoveButton from '../button/RemoveButton'
import { GET_CARS } from '../../queries'
import { useQuery } from '@apollo/client'
import CarItems from './CarItems'
import { Link } from "react-router-dom";
import DetailsCard from '../detail/DetailsCard'


const getStyles = () => ({
    personCard: {
        width: '600px'
    }
})

const PersonItems = props => {
    const styles = getStyles()
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const [editMode, setEditMode] = useState(false)

    const handleClick = () => {
        setEditMode(!editMode)
    }

    const { loading, error, data } = useQuery(GET_CARS)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <div>
            <Card
                title={`${firstName} ${lastName}`}
                actions={[
                    <EditOutlined key='edit' onClick={handleClick} />,
                    <RemoveButton id={id} />]}
                style={styles.personCard}
            >
                {editMode ? (
                    <UpdatePersonForm
                        id={props.id}
                        firstName={props.firstName}
                        lastName={props.lastName}
                        onClick={handleClick}
                        onBtnClick={handleClick}
                    />
                ) : (null)}
                {data.cars.map((car, index) => (
                    car.personId === props.id ? (
                        <CarItems
                            key={index}
                            make={car.make}
                            model={car.model}
                            year={car.year}
                            price={car.price}
                            id={car.id}
                        />
                    ) : null
                ))}
                <Link
                    to={{ pathname: `/${id}` }}
                    element={<DetailsCard />}>
                    <div>Learn More</div></Link>
            </Card>
        </div>
    )
}

export default PersonItems