 #define M_PI 3.141592
        #define M_PI_2 1.570796
        #define Altitude_Limit 1.3

        attribute vec4 vertexPosition;
        attribute float force;
        attribute float altitude;
        attribute vec2 azimuth;
        attribute vec2 velocity;

        uniform mat4 mvp;
        uniform float brushSize;
        attribute vec4 brushColor;

        varying lowp float angle;
        varying vec4 color;

        highp float rand(vec4 co)
        {
            highp float a = 12.9898;
            highp float b = 78.233;
            highp float c = 43758.5453;
            highp float dt= dot(co.xy ,vec2(a,b));
            highp float sn= mod(dt,3.14);
            return fract(sin(sn) * c);
        }
        float easeout(float start, float dis, float t)
        {
            return start-dis*t*(t-2.0);
        }
        float easein(float start, float dis, float t)
        {
            return dis*t*t*t+start;
        }
        void main()
        {   
            float speed = length(velocity);
            float mapping = (500.0-speed)/500.0;
            float speedfade = easein(0.5,1.0,mapping);
            float randNum = rand(vertexPosition);
            float randNum2 = rand(vertexPosition+vec4(1.26,4.39,0,0));
            float randNum3 = rand(vertexPosition+vec4(3.16,6.11,0,0));
            
            float altitude_map = float(Altitude_Limit > altitude) * (altitude/Altitude_Limit * M_PI_2 - M_PI_2) + M_PI_2;
            
            //if (altitude > Altitude_Limit)
            //    altitude = M_PI_2;
            //else
            //    altitude = altitude/Altitude_Limit * M_PI_2;
            
            float tiltValue = easein(0.0,1.0,-(altitude_map-M_PI_2));
            vec2 tiltVec = tiltValue*azimuth*5.0;
            float centerx = randNum-0.5;
            float centery = randNum2-0.5;
            
            float disx = centerx*0.5+tiltVec.x*easeout(1.0,-1.0,randNum2);
            float disy = centery*0.5-tiltVec.y*easeout(1.0,-1.0,randNum);
        
            
            gl_Position = mvp * (vertexPosition+vec4(disx,disy,0,0)*2.0);
            gl_PointSize = brushSize*float(4)*(1.0+tiltValue/2.0);
            angle = floor(randNum3*4.0)/4.0 * M_PI;
            angle = randNum3 * M_PI;
            
            //speed fade may be remove
            
            color = brushColor*easein(0.0,1.0,force);//*(0.5-centerx*centerx+centery*centery);;//speedfade;   
        }