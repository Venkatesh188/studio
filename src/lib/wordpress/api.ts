
// src/lib/wordpress/api.ts
import type { 
  WordPressPost, 
  WordPressCategory, 
  WordPressProject, 
  WordPressPage,
  WordPressTag,
  WordPressUser
} from '@/types/wordpress';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!API_URL) {
  throw new Error(
    'WordPress API URL is not configured. Please set NEXT_PUBLIC_WORDPRESS_API_URL.'
  );
}

async function fetchAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  // Add authentication headers if needed in the future
  // if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
  //   headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  // }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 10 }, // Revalidate every 10 seconds, adjust as needed
  });

  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2));
    throw new Error('Failed to fetch API. Check GraphQL query and WordPress endpoint.');
  }
  return json.data;
}

// Fragment for common post fields to reuse in queries
const POST_FIELDS_FRAGMENT = `
  id
  title
  excerpt
  slug
  date
  content
  featuredImage {
    node {
      sourceUrl(size: LARGE)
      altText
      mediaDetails {
        width
        height
      }
    }
  }
  author {
    node {
      name
      slug
      avatar {
        url
      }
    }
  }
  categories {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
  tags {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
`;

const PROJECT_FIELDS_FRAGMENT = `
  id
  title
  slug
  date
  content # Main description
  featuredImage {
    node {
      sourceUrl(size: LARGE)
      altText
      mediaDetails {
        width
        height
      }
    }
  }
  projectFields { # Assuming ACF group named 'projectFields'
    problemStatement
    toolsUsed
    outcome
    liveLink
    repositoryLink
    imageAiHint
  }
  tags {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
   author {
    node {
      name
    }
  }
`;


export async function getAllPosts(first = 10, after: string | null = null): Promise<{ posts: WordPressPost[], pageInfo: any }> {
  const data = await fetchAPI(
    `
    query GetAllPosts($first: Int, $after: String) {
      posts(first: $first, after: $after, where: { status: PUBLISH }) {
        edges {
          node {
            ${POST_FIELDS_FRAGMENT}
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
    `,
    { variables: { first, after } }
  );
  return {
    posts: data?.posts.edges.map((edge: { node: any }) => edge.node) || [],
    pageInfo: data?.posts.pageInfo
  };
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const data = await fetchAPI(
    `
    query GetPostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ${POST_FIELDS_FRAGMENT}
      }
    }
    `,
    { variables: { id: slug, idType: 'SLUG' } }
  );
  return data?.post;
}

export async function getAllCategories(): Promise<WordPressCategory[]> {
    const data = await fetchAPI(`
        query GetAllCategories {
            categories(first: 100) {
                edges {
                    node {
                        id
                        name
                        slug
                        description
                        count
                    }
                }
            }
        }
    `);
    return data?.categories.edges.map((edge: { node: any }) => edge.node) || [];
}


export async function getPostsByCategorySlug(categorySlug: string, first = 10, after: string | null = null): Promise<{ posts: WordPressPost[], pageInfo: any }> {
  const data = await fetchAPI(
    `
    query GetPostsByCategory($categorySlug: String!, $first: Int, $after: String) {
      posts(first: $first, after: $after, where: { categoryName: $categorySlug, status: PUBLISH }) {
        edges {
          node {
            ${POST_FIELDS_FRAGMENT}
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    `,
    { variables: { categorySlug, first, after } }
  );
   return {
    posts: data?.posts.edges.map((edge: { node: any }) => edge.node) || [],
    pageInfo: data?.posts.pageInfo
  };
}


export async function getAllProjects(first = 6, after: string | null = null): Promise<{ projects: WordPressProject[], pageInfo: any }> {
  const data = await fetchAPI(
    `
    query GetAllProjects($first: Int, $after: String) {
      projects(first: $first, after: $after, where: { status: PUBLISH }) { # Assuming 'projects' is your CPT slug
        edges {
          node {
            ${PROJECT_FIELDS_FRAGMENT}
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    `,
    { variables: { first, after } }
  );
  return {
    projects: data?.projects.edges.map((edge: { node: any }) => edge.node) || [],
    pageInfo: data?.projects.pageInfo
  };
}

export async function getProjectBySlug(slug: string): Promise<WordPressProject | null> {
  const data = await fetchAPI(
    `
    query GetProjectBySlug($id: ID!, $idType: ProjectIdType!) { # Adjust ProjectIdType if needed
      project(id: $id, idType: $idType) {
        ${PROJECT_FIELDS_FRAGMENT}
      }
    }
    `,
    { variables: { id: slug, idType: 'SLUG' } }
  );
  return data?.project;
}

export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
    const data = await fetchAPI(
        `
        query GetPageBySlug($id: ID!, $idType: PageIdType!) {
            page(id: $id, idType: $idType) {
                id
                title
                slug
                content
                date
                featuredImage {
                    node {
                        sourceUrl(size: LARGE)
                        altText
                    }
                }
                # Example for ACF fields on a page, adjust 'pageFields' and field names
                # pageFields {
                #   subheadline
                #   achievements {
                #     iconName
                #     text
                #   }
                # }
            }
        }
        `,
        { variables: { id: slug, idType: 'URI' } } // Often pages are fetched by URI
    );
    return data?.page;
}

// Example function to fetch "About" page content (assuming its slug is 'about')
export async function getAboutPageContent(): Promise<WordPressPage | null> {
  // You might need to adjust this query based on how your "About" page is structured in WordPress
  // For example, if you use Advanced Custom Fields (ACF) for specific sections.
  const data = await fetchAPI(
    `
    query GetAboutPage {
      page(id: "about", idType: URI) { # Assuming your "About" page slug is 'about'
        id
        title
        content
        featuredImage {
          node {
            sourceUrl(size: LARGE)
            altText
          }
        }
        # Example: ACF fields for achievements, assuming an ACF group 'aboutPageFields'
        # with a repeater 'achievements'
        aboutPageFields {
          mainText # If different from standard content
          imageAiHint
          achievements {
            icon # Store icon name or class
            text
          }
        }
      }
    }
    `
  );
  return data?.page;
}

export async function getRecentPosts(count = 3): Promise<WordPressPost[]> {
  const data = await fetchAPI(
    `
    query GetRecentPosts($count: Int) {
      posts(first: $count, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ${POST_FIELDS_FRAGMENT}
          }
        }
      }
    }
    `,
    { variables: { count } }
  );
  return data?.posts.edges.map((edge: { node: any }) => edge.node) || [];
}
