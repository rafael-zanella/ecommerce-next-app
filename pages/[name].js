import { useRouter } from 'next/router';


const Name = () => {
  const router = useRouter()
  const query = router.query;

  return <div>Not Found /{query.name}</div>
}

export default Name;