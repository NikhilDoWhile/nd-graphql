import { useMutation } from "@apollo/client"
import { filter } from 'lodash'
import { DeleteOutlined } from '@ant-design/icons'
import { GET_PEOPLE, DELETE_PERSON, DELETE_CAR, GET_CARS, DELETE_CARS } from '../../queries'

const RemoveButton = (props) => {

    const id = props.id
    const carId = props.carId
    const personId = props.id

    const [deletePerson] = useMutation(DELETE_PERSON, {
        update(cache, { data: { deletePerson } }) {
            const { people } = cache.readQuery({ query: GET_PEOPLE })
            cache.writeQuery({
                query: GET_PEOPLE,
                data: { people: filter(people, person => person.id !== deletePerson.id) }
            })
        }
    })

    const [deleteCar] = useMutation(DELETE_CAR, {
        update(cache, { data: { deleteCar } }) {
            const { cars } = cache.readQuery({ query: GET_CARS })
            cache.writeQuery({
                query: GET_CARS,
                data: { cars: filter(cars, car => car.id !== deleteCar.id) }
            })
        }
    })

    const [deleteCars] = useMutation(DELETE_CARS, {
        update(cache, { data: { deleteCars } }) {
            const { cars } = cache.readQuery({ query: GET_CARS })
            cache.writeQuery({
                query: GET_CARS,
                data: { cars: filter(cars, car => car.personId !== deleteCars.personId) }
            })
        }
    })

    const onClick = () => {
        let confirmation;

        if (props.id) {
            confirmation = window.confirm("Delete cars and person?")
            if (confirmation && props.id) {
                deletePerson({ variables: { id: id } })
                deleteCars({ variables: { personId: personId } })
            }
        }

        if (props.carId) {
            confirmation = window.confirm("Delete this item?")
            if (confirmation && props.carId) {
                deleteCar({ variables: { id: carId } })
            }
        }
    }
    return (
        <DeleteOutlined style={{ marginLeft: '10px' }} onClick={onClick} />
    )
}

export default RemoveButton