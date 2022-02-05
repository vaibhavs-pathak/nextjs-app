const UserProfilePage = (props) => {
  const { userName } = props;

  return (
    <h1>{userName}</h1>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      userName: 'Jack Demerse'
    }
  };
}

export default UserProfilePage