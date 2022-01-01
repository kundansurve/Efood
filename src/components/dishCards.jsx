import {React} from 'react';

class dishCard extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    render(){
        return (
        <div class="mdc-card mini-card mdc-elevation--z4">
            <div class="mdc-card__primary-action">
                <div class="media-image mdc-card__media mdc-card__media--square">
                    <div class="mdc-card__media-content">
                        <div class="card-info">
                            <h1>The new headphones</h1>
                            <h2>Explore</h2>
                            <h3>HEADPHONES</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
export default dishCard;