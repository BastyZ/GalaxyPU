#version 330 core

// Interpolated values from the vertex shaders
in vec2 UV;
in vec3 Position_worldspace;
in vec3 Normal_cameraspace;
in vec3 EyeDirection_cameraspace;
in vec3 LightDirection_cameraspace;

// Ouput data
out vec3 color;
in vec3 posiciones;
const vec3 VERDE = vec3(0.050, 0.168, 0.011);
const vec3 VERDE_CLARO = vec3(0.219, 0.8, 0.258);
const vec3 AMARILLO = vec3(0.925, 0.913, 0.196);
const vec3 CAFE = vec3(0.454, 0.286, 0.082);
const vec3 GRIS = vec3(0.643, 0.623, 0.596);
const vec3 BLANCO = vec3(1,1,1);
// Values that stay constant for the whole mesh.

float remap( float minval, float maxval, float curval )
{
    return ( curval - minval ) / ( maxval - minval );
}
// Values that stay constant for the whole mesh.
uniform mat4 MV;
uniform vec3 LightPosition_worldspace;

void main(){

  	// Light emission properties
  	// You probably want to put them as uniforms
  	vec3 LightColor = vec3(1,1,1);
  	float LightPower = 50.0f;

  	// Material properties
  	vec3 MaterialSpecularColor = vec3(0.001,0.001,0.001);
    vec3 AmbientLight = vec3(0.01,0.01,0.01);
  	// Distance to the light
  	float distance = length( LightPosition_worldspace - Position_worldspace );

  	// Normal of the computed fragment, in camera space
  	vec3 n = normalize( Normal_cameraspace );
  	// Direction of the light (from the fragment to the light)
  	vec3 l = normalize( LightDirection_cameraspace );
  	// Cosine of the angle between the normal and the light direction,
  	// clamped above 0
  	//  - light is at the vertical of the triangle -> 1
  	//  - light is perpendicular to the triangle -> 0
  	//  - light is behind the triangle -> 0
  	float cosTheta = clamp( dot( n,l ), 0,1 );

  	// Eye vector (towards the camera)
  	vec3 E = normalize(EyeDirection_cameraspace);
  	// Direction in which the triangle reflects the light
  	vec3 R = reflect(-l,n);
  	// Cosine of the angle between the Eye vector and the Reflect vector,
  	// clamped to 0
  	//  - Looking into the reflection -> 1
  	//  - Looking elsewhere -> < 1
  	float cosAlpha = clamp( dot( E,R ), 0,1 );
    if(posiciones.y<0.62798433){
      color = AmbientLight
      +mix( VERDE, VERDE_CLARO, remap( -0.31382, 0.62798433, posiciones.y ) ) * LightColor * LightPower * cosTheta / (distance*distance)
      +MaterialSpecularColor * LightColor * LightPower * pow(cosAlpha,5) / (distance*distance);
    }
    else if(posiciones.y<1.25596866){
      color = AmbientLight
      +mix( VERDE_CLARO, AMARILLO, remap( 0.62798433, 1.25596866, posiciones.y ) )* LightColor * LightPower * cosTheta / (distance*distance)
      +MaterialSpecularColor * LightColor * LightPower * pow(cosAlpha,5) / (distance*distance);
    }
    else if(posiciones.y<1.883953){
      color = AmbientLight
      +mix( AMARILLO, CAFE, remap( 1.25596866, 1.883953, posiciones.y ) )* LightColor * LightPower * cosTheta / (distance*distance)
      +MaterialSpecularColor * LightColor * LightPower * pow(cosAlpha,5) / (distance*distance);
    }
    else if(posiciones.y<2.51193734){
      color = AmbientLight
      +mix( CAFE, GRIS, remap( 1.883953, 2.5119373, posiciones.y ) )* LightColor * LightPower * cosTheta / (distance*distance)
      +MaterialSpecularColor * LightColor * LightPower * pow(cosAlpha,5) / (distance*distance);
    }
    else if(posiciones.y<3.13992166){
      color = AmbientLight
      +mix( GRIS, BLANCO, remap( 2.5119373, 3.13992166, posiciones.y ) )* LightColor * LightPower * cosTheta / (distance*distance)
      +MaterialSpecularColor * LightColor * LightPower * pow(cosAlpha,5) / (distance*distance);
    }
    else{
      color = AmbientLight
      +vec3(1,1,1)* LightColor * LightPower * cosTheta / (distance*distance)
      +MaterialSpecularColor * LightColor * LightPower * pow(cosAlpha,5) / (distance*distance);
    }
}
