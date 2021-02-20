import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import styled from 'styled-components';


const Container = styled.div`

  /* background: red; */

`;

const HomePage = (props) => {
  return props.products.map(product => {
    return (
      <Container key={product.slug}>

        <Link href={product.slug}>
          <a>
           <h1>{product.name}</h1>
          </a>
        </Link>
        
        <p>{product.description}</p>
        <p>${product.price / 100}</p>
      </Container>
    )
  })
}

export const getStaticProps = async () => {
  const directory = `${process.cwd()}/content`
  const fileNames = fs.readdirSync(directory);

  const products = fileNames.map(filename => {
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
    const { data } = matter(fileContent)
    const slug = `/products/${filename.replace('.md', '')}`;
    const product = {
      ...data,
      slug,
    }
    return product;
  })

  return {
    props: {
      products,
    }
  }
}

export default HomePage;