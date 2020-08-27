import React from 'react';
import PrimaryButton from '../PrimaryButton';

interface Props {
    children: React.ReactNode;
}
interface State {
    error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error: Error) {
        this.setState({
            error: error
        });
    }

    reload() {
        window.location.reload(false);
    }

    render() {
        if (this.state.error) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <h2>Something went wrong 😭</h2>
                    <br />
                    <PrimaryButton width={'220px'} onClick={this.reload}>
                        Try again 🤞
                    </PrimaryButton>
                </div>
            );
        }

        return this.props.children;
    }
}
