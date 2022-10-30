import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Routes, Route } from "react-router-dom"
import PeopleDetails from './components/lists/PeopleDetails'
import DetailsCard from './components/detail/DetailsCard'
import './App.css'
import 'antd/dist/antd.min.css'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql/',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='Container'>
        <Routes>
          <Route path="/" element={<PeopleDetails />} />
          <Route path="/:id" element={<DetailsCard />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
