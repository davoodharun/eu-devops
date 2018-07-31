import * as React from "react";
import 'whatwg-fetch';
// your collection url


class AboutPage extends React.Component<{}, {}> {
    public render(): JSX.Element {
        
        let collectionUrl = "https://exelontfs.visualstudio.com/defaultcollection";

// ideally from config
let token: string = ""; 
      

        return (<h1>About</h1>);
    }
}

export default AboutPage;
