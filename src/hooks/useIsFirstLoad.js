

export default (keyName='isFirstVisit') => {
  // const [isFirstVisit, setIsFirstVisit] = useState(false);

  // useEffect(() => {
  //   if (!localStorage[keyName]) {
  //     setIsFirstVisit(true);
  //     localStorage[keyName] = true;
  //   }
  // }, [keyName]);

  if (!localStorage[keyName]) {
    // localStorage[keyName] = true;
    return true;
  }

  return false;
}
