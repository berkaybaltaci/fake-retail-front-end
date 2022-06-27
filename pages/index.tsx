import type { NextPage } from 'next'
import HomePage from '../components/home/home-page'

const Home: NextPage = () => {
  return (
    <HomePage viewCount={50}/>
  )
}

export default Home
