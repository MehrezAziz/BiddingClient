import { useEffect, useState } from "react";

export default function DraggableButton() {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(() => {
      const storedPosition = localStorage.getItem('draggableButtonPosition');
      return storedPosition ? JSON.parse(storedPosition) : { x: 0, y: 0 };
    });
  
    useEffect(() => {
      localStorage.setItem('draggableButtonPosition', JSON.stringify(position));
    }, [position]);
  
    const handleMouseDown = (event) => {
      event.preventDefault(); 
      setIsDragging(true);
  
      const clientX = event.clientX || event.touches[0].clientX;
      const clientY = event.clientY || event.touches[0].clientY;
  
      const offsetX = clientX - position.x;
      const offsetY = clientY - position.y;
  
      const handleMouseMove = (moveEvent) => {
        let moveClientX, moveClientY;
  
        if (moveEvent.clientX !== undefined) {
            moveClientX = moveEvent.clientX;
            moveClientY = moveEvent.clientY;
        } else if (moveEvent.touches && moveEvent.touches.length > 0) {
            moveClientX = moveEvent.touches[0].clientX;
            moveClientY = moveEvent.touches[0].clientY;
        } else {
            // Handle the case where neither clientX nor touches[0].clientX is available
            return;
        }
    
        let x = moveClientX - offsetX;
        let y = moveClientY - offsetY;
    
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
    
        x = Math.max(0, Math.min(x, screenWidth - 57)); // Assuming width of the draggable button is 50px
        y = Math.max(0, Math.min(y, screenHeight - 50)); // Assuming height of the draggable button is 50px
    
        setPosition({ x, y });
      };
  
      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleMouseUp);
      };
  
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleMouseUp);
    };
  
    const handleButtonClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    return (
      <div
        className="draggable"
        style={{ left: position.x, bottom: `20px`, position: 'fixed', userSelect: 'none' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onClick={handleButtonClick}
      >
        &#9652;
      </div>
    );
  }
  