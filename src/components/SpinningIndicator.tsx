type SpinningIndicatorProps = {
    size?: number;
    bgColor?: string;
}


export const SpinningIndicator = ({ size=10, bgColor="#FFF" }: SpinningIndicatorProps) => {
    return (
        <div className="meetup" style={{ width: `${size}px`, height: `${size}px` }}>
          <div style={{backgroundColor: `${bgColor}`}}></div>
          <div style={{backgroundColor: `${bgColor}`}}></div>
          <div style={{backgroundColor: `${bgColor}`}}></div>
          <div style={{backgroundColor: `${bgColor}`}}></div>
        </div>
      );
}
