export default function RenderIf(condition, content) {
  if (condition) {
    return content;
  } else {
    return null;
  }
}
