export default function mergeRefs(...refs) {
  const filteredRefs = refs.filter(Boolean);

  if (filteredRefs.length === 0) {
    return null;
  }

  if (filteredRefs.length === 1) {
    return filteredRefs[0];
  }

  return (instance) => {
    for (const ref of filteredRefs) {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref) {
        ref.current = instance;
      }
    }
  };
}
