#version 330 core

// Interpolated values from the vertex shaders
in vec2 UV;
in vec3 Position_worldspace;
in vec3 Normal_cameraspace;
in vec3 EyeDirection_cameraspace;
in vec3 LightDirection_cameraspace;
in vec2 LightRadious;
in float distance;

// Ouput data
out vec4 color;
in vec3 posiciones;

uniform sampler2D myTextureSampler;

void main(){
    float a = LightRadious.x;
    //color = vec4(a,a,a,a)/vec4(distance/2000,distance/2000,distance/2000,1);
    color = texture( myTextureSampler, gl_PointCoord);
}
