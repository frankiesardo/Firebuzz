export default function useParams() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(params);
}
