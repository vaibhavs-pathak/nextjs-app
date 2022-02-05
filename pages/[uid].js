const UserIdPage = (props) => {
  return (
    <h1>{props.userId}</h1>
  )
}

export default UserIdPage

export async function getServerSideProps(context) {
  const { params } = context;

  return {
    props: {
      userId: `userId is ${params.uid}`
    }
  }
}