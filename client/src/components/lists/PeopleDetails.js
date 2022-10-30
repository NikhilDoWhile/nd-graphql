import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../queries'
import { List } from 'antd'
import PersonItems from '../listItems/PersonItems'
import AddPersonForm from '../../forms/AddPersonForm'
import AddCarForm from '../../forms/AddCarForm'
import HeaderSection from '../../layout/HeaderSection'

const getStyles = () => ({
    people: {
        display: 'flex',
        justifyContent: 'center'
    }
})

const PeopleDetails = () => {
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_PEOPLE)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <>
            <HeaderSection />
            <AddPersonForm />
            {data.people.length > 0 ? (
                <AddCarForm />
            ) : null}
            <List grid={{ gutter: 20, column: 1 }} style={styles.people}>
                {data.people.map((person, index) => (
                    <List.Item key={index}>
                        <PersonItems
                            key={person.id}
                            firstName={person.firstName}
                            lastName={person.lastName}
                            id={person.id}
                        />
                    </List.Item>
                ))}
            </List>
        </>
    )
}

export default PeopleDetails 