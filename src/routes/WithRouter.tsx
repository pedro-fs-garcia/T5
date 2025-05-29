import { useParams } from "react-router-dom";


export default class RoutesUtils {

    withRouter(Component: any) {
      return function ComponentWithRouterProps(props: any) {
        const params = useParams();
        return <Component {...props} router={{ params }} />;
      };
    }
}