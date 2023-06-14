import { useEffect, useState } from "react";
import "./App.css";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  );
}

function Posts() {
  const [postId, setPostId] = useState(-1);
  const [isClicked, setIsClicked] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const HandleClick = (e) => {
    const clickedPostId = parseInt(e.target.id);
    setPostId(clickedPostId);
    setIsClicked(true);
    console.log(postId);
  };
  const handleBack = () => {
    setIsClicked(false);
  };

  return (
    <div>
      {!isClicked
        ? data.map((post) => (
            <div>
              <h1 id={post.id} key={post.id} onClick={HandleClick}>
                {post.title}
              </h1>
              <p>{post.body}</p>
            </div>
          ))
        : data
            .filter((post) => post.id === postId)
            .map((element) => {
              return (
                <div>
                  <h1 id={element.id} key={element.id}>
                    {element.title}
                  </h1>
                  <p>{element.body}</p>

                  <button onClick={handleBack}>Back to Posts</button>
                </div>
              );
            })}
    </div>
  );
}

export default App;
