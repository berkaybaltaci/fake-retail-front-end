const HomePage: React.FC<{viewCount: number}> = ({viewCount}) => {
  return <div>
    <h1>HOME PAGE</h1>
    <p>View count is {viewCount}</p>
  </div>
}

export default HomePage;