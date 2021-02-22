import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import styled from 'styled-components';
import UnstyledLink from '../components/styled/UnstyledLink'

const Container = styled.div`
  background: white;
  padding: 1rem 2rem;
  min-height: 200px;
  position: relative;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.02);
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  margin: 0.5rem;
`;


const Price = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  font-size: 2.5rem;
`;

const HomePage = (props) => {

  const renderProduct = (product) => {
    return (
      <Link href={product.slug}>
        <UnstyledLink>
          <Container key={product.slug}>
            <h1>{product.name}</h1>   
            <p>{product.description}</p>
            <Price>${product.price / 100}</Price>
          </Container>
        </UnstyledLink>
      </Link>
    )
  }

  return (
    <ProductsContainer>
      { 
        props.products.map(renderProduct)
      }
    </ProductsContainer>
  )
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